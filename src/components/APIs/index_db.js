let version = 1;
    let myStores = ["football_db"];
 
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

export { retriveData, IDBConfig, saveStoreObj };
