

// export default () => {

    let serverUrl = 'https://eef-staging-f608d9a34c34.herokuapp.com/api/'
    let currentDateNow,client_timezone,client_date_str,IDBConfig;

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

    addEventListener('message', e => { // eslint-disable-line no-restricted-globals

      console.log(e,'length',e.length)
      
      if (!e||!e.data)return;
      try {
        
        [currentDateNow,client_timezone,client_date_str,IDBConfig]  = e.data;
        console.log({IDBConfig})
        if(!IDBConfig)return;

       const dbData = IDBConfig.working_dir.data;
        if (!Object.keys(dbData).includes('fixtures')||!Object.keys(dbData.fixtures).includes('response')) {
            fetchFixturesServer({'req_date':currentDateNow,timezone:client_timezone})
            .then(async(res)=>{
                if (!Object.keys(res.fixtures).includes('response')) {
                    //fixture was not loaded succesfuly, try second time
                    fetchFixturesServer({'req_date':currentDateNow,timezone:client_timezone})
                    .then((res)=>{
                        if (Object.keys(res.fixtures).includes('response')){
                            IDBConfig.working_dir.data.fixtures=res.fixtures
                            postMessage({'data':IDBConfig.working_dir.data.fixtures.response,type:'setData',saveStoreObj:IDBConfig})
                            fetchOddData(dbData,currentDateNow)
                        }
                    })
                }else{
                    IDBConfig.working_dir.data.fixtures=res.fixtures
                    postMessage({'data':IDBConfig.working_dir.data.fixtures.response,type:'setData',saveStoreObj:IDBConfig})
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
            if(dbData.run_list.current_page<dbData.run_list.to_run.length){fetchOddData(dbData,currentDateNow);}}
        }
      } catch (error) {console.log(e)}
           
    })

    const fetchOddData = async(dbData,currentDate) => {

        
        if(!Object.keys(dbData).includes('odds')){dbData['odds']=[]}
    
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
                    // set Datas >><<
                    dbData.run_list = { 
                        to_run:range(1,page1.paging.total),
                        ran:[1],
                        current_page:1
                    }
                
                    dbData['odds'].push(...page1.response);
                    dbData.total_page=page1.paging.total;
            
                    postMessage({'data':page1.response,'type':'setAllData',saveStoreObj:IDBConfig})
                    
            
                }
                
                // filter pages left from pages available
                loop_paginations = dbData.run_list.to_run.filter(function(item) {
                    return !dbData.run_list.ran.includes(item) ? true : false;
                });
            
                // console.log({loop_paginations});
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
                
                        
                        if (dbData.run_list.current_page>=dbData.run_list.to_run.length){
                            postMessage({'data':odds_pagination.response,'type':'setAllData', lastPage:true,saveStoreObj:IDBConfig});
                        } else {
                            postMessage({'data':odds_pagination.response,'type':'setAllData',saveStoreObj:IDBConfig})
                        }
                    }
                });
            }
        
      
    };
    
// }