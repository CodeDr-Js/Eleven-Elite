// import axios from "axios";
// import { saveStoreObj } from "./components/APIs/index_db";
// import * as api from "./components/api-service/api-service";


export default () => {

    let version = 1;
    let myStores = ["football_db"];
    let serverUrl = 'https://eef-478a01632e14.herokuapp.com/api/'

    // serverUrl = 'http://127.0.0.1:8000/api/'

    let currentDateNow,client_timezone,client_date_str;

    const IDBConfig = {
        name: "my_awesome_idb",
        version,
        stores: [
            {
            name: "football_db",
            keyPath: "url",
            },
        ],
        working_dir: null,
    };

    let default_data = {
        url: new Date().toISOString().split("T")[0],
        data: {},
    };

    const createIndexedDB = ({ name, version, stores }) => {
    const request = indexedDB.open(name, version);
    return new Promise((resolve, reject) => {
        request.onupgradeneeded = (e) => {
        const db = e.target.result;

        stores.map(({ name, keyPath }) => {
           // console.log("mapping stores", name);
            db.createObjectStore(name, { keyPath });
            if (!db.objectStoreNames.contains(name)) {
            }
        });
        };

        //???

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
    };

    //???
    const getStoreFactory =
    (dbName, version) =>
    (store, mode = "readonly") => {
        return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, version);
        request.onsuccess = (e) => {
            const db = request.result;
            try {
            const transactions = db.transaction(store.name, mode);
            const transaction = transactions.objectStore(store.name);
            return resolve({ transaction, store });
            } catch (e) {
            //console.log(e);
            indexedDB.deleteDatabase(IDBConfig.name);
            }
        };
        request.onerror = (e) => {
            console.debug(e);
            reject(request.error);
        };
        });
    };

    const openStore = getStoreFactory('my_awesome_idb', version);

    const saveStoreObj = async (data, name = "football_db") => {
    try {
        //????
        const { transaction, store } = await openStore(
        IDBConfig.stores[myStores.indexOf(name)],
        "readwrite"
        );
        // console.log(transaction, store);
        transaction.put(data);
        //console.log("putting data to store", data);
    } catch (error) {
        //console.log("idb error", error);
    }
    };

    const retriveData = async ( url = new Date().toLocaleDateString(),name = "football_db") => {
        // initialize the indexedDB if it does not exist
        // indexedDB?createIndexedDB(IDBConfig):0;

        //??
        if (indexedDB) {
            createIndexedDB(IDBConfig);
        }
        //console.log("retrivingData____ with data>>", url);
        //??
        const { transaction, store } = await openStore(IDBConfig.stores[myStores.indexOf(name)],"readwrite");
        let last_date=url;
        const cursors = transaction.openCursor();
        cursors.onsuccess=event=>{
            const cursor = event.target.result;
            if(cursor){
                last_date=cursor.key
                let date=cursor.key
                let canDeleteData=new Date(date) < new Date(url)
                if(canDeleteData){
                    const delCursor = cursor.delete();
                    delCursor.onsuccess = () => {
          //              console.log( "Deleted ", );
                    };
                }
                cursor.continue();
            }
            if (cursors.readyState.includes("done")) {
            //    console.log('cursor DONE')
                //const request = transaction.get(last_date);
                const request = transaction.get(url);
                let [data, dataEt] = [{}, false];

                request.onsuccess = (e) => {
                    // check if the request data exist
                    if (request.result) {
                        data = request.result;
                        dataEt = true;
                    } else {
              //          console.log("No req_data");
                        data = {
                            url,
                            data: {},
                        };
                        
                        //optionally save empty data
                        saveStoreObj(data);
                    }
                    // now we have our working dir containing datas of the current data < start filling the datas with your informations and call the saveStoreObj when needed.>
                    IDBConfig.working_dir = data;
                    IDBConfig.dataEt = dataEt;
                };
                request.onerror = (e) => {
                //    console.log(e);
                };
            }
        };
        cursors.onerror = e =>{console.log(e.error);}
        //??
       // console.log('using last date>><',last_date)
        
    };
    // index Db ended

    function range(start, end) { return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start); }

    const fetchFixturesServer = (body) =>{
        let endpoint = "soccer/retrieve_fixtures/";
        return fetch(serverUrl + endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body)
        }).then( async (resp) => resp.json())
   
    }

    self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals

        if (!e)return;
        
        [currentDateNow,client_timezone,client_date_str]  = e.data;
        
        retriveData(currentDateNow)
        .then(()=>{
            
          const timeOut = setInterval(() => {
            if (IDBConfig.working_dir !== null) {
                clearInterval(timeOut);
         //       console.log('Runing<<>',{IDBConfig,currentDateNow,client_timezone,client_date_str})
                const dbData = IDBConfig.working_dir.data;
                // console.log('DATA RETRIEVED>>><<',IDBConfig.working_dir)
                // return
                if (!Object.keys(dbData).includes('fixtures')) {
                    fetchFixturesServer({'req_date':currentDateNow,timezone:client_timezone})
                    .then(async(res)=>{
                        console.log('Data from server>>',res)
                        if (!Object.keys(res.fixtures)[0]) {
                            //fetch  data from football api
           //                 console.log('NO FIXTURE DATA FOUND FOR REQ DATE');
                            // await fetchFixtures(dbData,currentDateNow)
                            
                        }else{
                            // fixture was retrieved from server 'check if 
             //               console.log('data was retrieved from server ')
                            IDBConfig.working_dir.data.fixtures=res.fixtures
                            postMessage({'data':IDBConfig.working_dir.data.fixtures.response,type:'setData'})
                            saveStoreObj(IDBConfig.working_dir);
                            fetchOddData(dbData,currentDateNow)
                        }
                    })
                }
                else { 
                // fixture data already exist in user db >><< checking the odd
                    postMessage({data:IDBConfig.working_dir.data.fixtures.response,type:'setData'})
               //     console.log("Fixture Data UPDATED>><<", IDBConfig.working_dir.data);
                if (!Object.keys(dbData).includes("odds")||!dbData.odds[0]) {
                 //   console.log('NO ODD DATA FOUND>>> Fetching ODDS');
                    fetchOddData(dbData,currentDateNow);
                } else {
                   // console.log("Odd is found", IDBConfig.working_dir);
                    // setAllData(IDBConfig.working_dir.data.odds);
                    postMessage({data:IDBConfig.working_dir.data.odds,type:'setAllData',lastPage:true})            
                    if(dbData.run_list.current_page<dbData.run_list.to_run.length){fetchOddData(dbData,currentDateNow);}
                    else{//console.log('DATA NOW COMPLETED')
                        
                    }              
                }
                }
            }
          }, 100);
          
        })

    
        

    })

    const fetchOddData = async(dbData,currentDate) => {

        console.log('NOW RUNNING ODDS FUNC',{currentDate});
        
        if(!Object.keys(dbData).includes('odds')){dbData['odds']=[]}
    
    
            /** 
             const retrieve_odds
                try to retrive the odd data from server
                !dbData.total_page
                const server_odd_data = await API.fetchOdd({req_date:client_date_str,timezone:client_timezone})
                console.log({server_odd_data})
            */
        
            const request_APi = async (page) =>{
                let endpoint = "soccer/retrieve_odds/";
                return fetch(serverUrl + endpoint, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({'timezone':client_timezone,req_date:client_date_str,page})
                  }).then( async (resp) => resp.json())
                  
              
            }
        
            
            if(!dbData.total_page||dbData.total_page>dbData.run_list.current_page){
            // update IDB odd data with football APi ODD    
        
                let loop_paginations,newData;
                
                if(!dbData.total_page){ 
                    
                    let page1 = await request_APi(1);
                    if(!page1) return

                    console.log({page1})
                    // set Datas >><<
                    dbData.run_list = { 
                        to_run:range(1,page1.paging.total),
                        ran:[1],
                        current_page:1
                    }
                
                    dbData['odds'].push(...page1.response);
                    dbData.total_page=page1.paging.total;
            
                    saveStoreObj(IDBConfig.working_dir)
                    // postMessage(page1.response)
                    postMessage({'data':page1.response,'type':'setAllData'})
                    // setAllData((prevData) => [...prevData, ...page1.response])
                    
                    // save odd page to server
            
                }
                
                // filter pages left from pages available
                loop_paginations = dbData.run_list.to_run.filter(function(item) {
                    return !dbData.run_list.ran.includes(item) ? true : false;
                });
            
                console.log({loop_paginations});
                // return

                //loop pages left to save >><<
                // for (let index = 0; index < loop_paginations.length; index++) {
                  
                //     let page = loop_paginations[index]
                //     console.log('loding PAGE',page)
                    
                //     let odds_pagination =  await request_APi(page)
                //     if(!odds_pagination||!odds_pagination.response) {console.log('NO ODDS FOUND');return}
                    
                //     console.log('UPDATING>><<',{odds_pagination:odds_pagination.response,page})
                //     if(!odds_pagination.response)break

                //     dbData['odds'].push(...odds_pagination.response);
                //     dbData.run_list.current_page += 1
                //     dbData.run_list.ran[page]=page
            
                //     saveStoreObj(IDBConfig.working_dir) //save to IDB
                //     //   setAllData((prevData) => [...prevData, ...odds_pagination.response]); //send to users element
                //     postMessage({'data':odds_pagination.response,'type':'setAllData'})
                //     // save odd page to server
                    
                //     if (dbData.run_list.current_page>=dbData.run_list.to_run.length){
                //         console.log('DONE LOOPING ',{IDBConfig})
                //     }
                //     // loop_paginations.length=0
                //     // console.log({loop_paginations})
                    
                // }
                let not_run=false
                loop_paginations.map(async (page,index) => {
                
                    if(!not_run) {

                        let odds_pagination =  await request_APi(page)
                        if(!odds_pagination||!odds_pagination.response) {console.log('NO ODDS FOUND');not_run=true;return}
                        
                        console.log('UPDATING>><<',{odds_pagination:odds_pagination.response,page})
                            
                        dbData['odds'].push(...odds_pagination.response);
                        dbData.run_list.current_page += 1
                        dbData.run_list.ran[page]=page
                
                        saveStoreObj(IDBConfig.working_dir) //save to IDB
                        //   setAllData((prevData) => [...prevData, ...odds_pagination.response]); //send to users element
                        if (dbData.run_list.current_page>=dbData.run_list.to_run.length){
                            postMessage({'data':odds_pagination.response,'type':'setAllData', lastPage:true});
    
                        } else {
                            postMessage({'data':odds_pagination.response,'type':'setAllData'})
                        }
                    }
                });
            }
        
      
    };
    
   
}
