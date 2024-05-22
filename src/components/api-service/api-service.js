import { pathname } from "../search_dir/search_dir"
//console.log(pathname);


let Token='5e26b54473f0cce5a2e84a5a209ec5340ae2357e'
let url = 'https://eef-478a01632e14.herokuapp.com/api/'
export class API {

    static loginUser(body){
        let endpoint='login/'
        return fetch(url+endpoint,{
            'method':'POST',
            'headers':{
            'Content-Type':'application/json',
            // 'Authorization':`Token ${Token}`
            },
            'body':JSON.stringify(body)
        })
        .then(resp=>resp.json())
    }
    static setPin(body, Token){
        let endpoint='wallet/set_pin/'
        return fetch(url+endpoint,{
            'method':'POST',
            'headers':{
            'Content-Type':'application/json',
            'Authorization':`Token ${Token}`
            },
            'body':JSON.stringify(body)
        })
        .then(resp=>resp.json())
    }
    
    static withdraw(body, Token){
        let endpoint='wallet/withdraw/'
        return fetch(url+endpoint,{
            'method':'POST',
            'headers':{
            'Content-Type':'application/json',
            'Authorization':`Token ${Token}`
            },
            'body':JSON.stringify(body)
        })
        .then(resp=>resp.json())
    }
    
    static transaction(body, Token){
       console.log(body);
        let endpoint=`transaction/?filter_date=${body.filter_date}&transaction_type=${body.transaction_type}`
        console.log(endpoint);
        return fetch(url+endpoint,{
            'method':'GET',
            'headers':{
            'Content-Type':'application/json',
            'Authorization':`Token ${Token}`
            }
        })
        .then(resp=>resp.json())
    }


    static registerUser(body){
        console.log(body);
         let endpoint = "register/";
         return fetch(url + endpoint, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             // 'Authorization':`Token ${Token}`
           },
           body: JSON.stringify(body),
         }).then((resp) => resp.json());
    }

    static forgetPassword(body){
        console.log(body);
         let endpoint = "forgot-password/";
         return fetch(url + endpoint, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             // 'Authorization':`Token ${Token}`
           },
           body: JSON.stringify(body),
         }).then((resp) => resp.json());
    }

    static logout(body){
        console.log(body);
         let endpoint = "logout/";
         return fetch(url + endpoint, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             // 'Authorization':`Token ${Token}`
           },
           body: JSON.stringify(body),
         }).then((resp) => resp.json());
    }

    static paynow(body, Token){
        console.log(body);
         let endpoint = "betdir/paynow/";
         return fetch(url + endpoint, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             'Authorization':`Token ${Token}`
           },
           body: JSON.stringify(body)
         }).then((resp) => resp.json());
    }

    static retrieveData(token){
         let page = pathname.replace('/', "");
         let endpoint = `retrieve-data/?page=${page}`;
         return fetch(url + endpoint, {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
             'Authorization':`Token ${token}`
           },
         }).then((resp) => resp.json());
    }

    static fetchFixtures(body){
        
      let endpoint = "soccer/retrieve_fixtures/";
      return fetch(url + endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Encoding': 'gzip'
          // 'Authorization':Token ${token}
        },
        body: JSON.stringify(body)
      }).then( async (resp) => resp.json())
 
    }

    static cancelTicket(body, Token){
      console.log(body);
       let endpoint = "betdir/cancel_bet/";
       return fetch(url + endpoint, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
           'Authorization':`Token ${Token}`
         },
         body: JSON.stringify(body)
       }).then((resp) => resp.json());
  }
    static logout(Token){
      //console.log(body);
       let endpoint = "logout/";
       return fetch(url + endpoint, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
           'Authorization':`Token ${Token}`
         },
       }).then((resp) => resp.json());
  }
    static notification(Token){
      //console.log(body);
       let endpoint = "notification/";
       return fetch(url + endpoint, {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
           'Authorization':`Token ${Token}`
         },
       }).then((resp) => resp.json());
  }
    static promotion(Token){
      //console.log(body);
       let endpoint = "promotion/teams/";
       return fetch(url + endpoint, {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
           'Authorization':`Token ${Token}`
         },
       }).then((resp) => resp.json());
  }

    static invite(Token){
      //console.log(body);
       let endpoint = "promotion/invite_reward/"

       return fetch(url + endpoint, {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
           'Authorization':`Token ${Token}`
         },
       }).then((resp) => resp.json());
  }

    static pending(Token){
      //console.log(body);
       let endpoint = "promotion/pending_friends/"

       return fetch(url + endpoint, {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
           'Authorization':`Token ${Token}`
         },
       }).then((resp) => resp.json());
  }

    static removeBonus(Token){
      //console.log(body);
       let endpoint = "settings/delete_bonus_key/"

       return fetch(url + endpoint, {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
           'Authorization':`Token ${Token}`
         },
       }).then((resp) => resp.json());
  }

  static changePassword(body, Token){
    //console.log(body, Token);
     let endpoint = "settings/change_password/";
     return fetch(url + endpoint, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         'Authorization':`Token ${Token}`
       },
       body: JSON.stringify(body)
     }).then((resp) => resp.json());
}

  static changePin(body, Token){
     let endpoint = "wallet/change_transaction_pin/";
     return fetch(url + endpoint, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         'Authorization':`Token ${Token}`
       },
       body: JSON.stringify(body)
     }).then((resp) => resp.json());
}

  static redeem_gift(body, Token){
     let endpoint = "settings/redeem_gift/";
     return fetch(url + endpoint, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         'Authorization':`Token ${Token}`
       },
       body: JSON.stringify(body)
     }).then((resp) => resp.json());
}

}