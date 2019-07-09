const axios = require('axios');

var SparrowSms = {
    token: "",
    identity: "",

    /**
     * [Function to initalize the module
     * @param  {[String]} token [Token generated from Sparrow SMS's website.
     * @param  {[Number]} identity [Identity provided by Sparrow SMS.]
     */
    init: (token, identity) => {
        this.token = token,
        this.identity = identity;
    },

    getToken : () => {
        return this.token;
    },

    getIdentity : () => {
        return this.identity;
    },

    /**
     * Function to send SMS
     * @param  {[String]} smsContent Message contents that to be send.
     * @param  {[String]} to To whom message to be send.
    */
    sendSMS : (smsContent, to) => {
        const token = this.token;
        const identity = this.identity;
        const formData = {
            token:this.token,
            from: this.identity,
            to: to,
            text: smsContent
        }

        const encodeForm = (data) => {
            return Object.keys(data)
                .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                .join('&');
        }

        console.log(this.token + " " + this.identity + " "+ to + " " + smsContent)
        axios
        .post('http://api.sparrowsms.com/v2/sms/', encodeForm(formData))
        .then(res =>{
            console.log(res);
            let count = res.data.count;
            let response = res.data.response;
            let message_id = res.data.message_id
            let credit_consumed = res.data.credit_consumed
            let credit_available = res.data.credit_available

            let data = {
                "error":false,
                "count": count,
                "message": response,
                "message_id": message_id,
                "credit_consumed": credit_consumed,
                "credit_available": credit_available,
            }
            return data;
        })
        .catch(error =>{
            console.log(error);
            let error_message = error.response.data.response;
            console.error(error_message);
            let data = {
                "error":true,
                "message":error_message
            }
            return data;
        })
    }
}

module.exports = SparrowSms;