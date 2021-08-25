/* Importing the libraries and modules that I need */
import React from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

export default class PaypalButton extends React.Component {
  render() {
    const onSuccess = (payment) => {
      console.log("The payment was succeeded!", payment);
      // Binding the "payment" object's value
      this.props.tranSuccess(payment);
    };

    const onCancel = (data) => {
      // User pressed "cancel" or close Paypal's popup
      console.log("The payment was cancelled!", data);
    };

    const onError = (err) => {
      // The main Paypal's script cannot be loaded or somethings block the loading of that script
      console.log("Error!", err);
      // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
      // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
    };

    /* setting the variables that I need */
    let env = "sandbox";
    let currency = "USD";
    let total = this.props.total;

    /* A variable that stores the information needed to connect to my sandbox PayPal account */
    const client = {
      sandbox:
        "AW1vveNM3NuYcd-hingIrptlxchPZM6jdLzLvdEnETLTgb_mG0haGRJtPahJViIrYNygOCurkBk9EPxj",
      production: "YOUR-PRODUCTION-APP-ID",
    };

    /* A variable containing style properties that will be used for the PaypalExpressBtn */
    let style = {
      size: "small",
      color: "blue",
      shape: "rect",
      label: "checkout",
      tagline: false,
    };

    /* Returning the PaypalExpressBtn and passing in the values that are needed */
    return (
      <PaypalExpressBtn
        env={env}
        client={client}
        currency={currency}
        total={total}
        onError={onError}
        onSuccess={onSuccess}
        onCancel={onCancel}
        style={style}
      />
    );
  }
}

/* Resource used for this code:
   ============================
   Article on react paypal express checkout
   Date published: 3 years ago
   Published by: thinhvo0108
   Link to article: https://www.npmjs.com/package/react-paypal-express-checkout
   ============================================================================
*/

/* Another resource used as a guide: 
   ================================= 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
