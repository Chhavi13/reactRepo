import { PaymentElement , CardElement 
 } from '@stripe/react-stripe-js';
import React from 'react';

const Form = () => {
    return (
        <div>
            <form>
                {/* <PaymentElement /> */}
                <CardElement/>
                <button>Submit</button>
            </form>
        </div>
    );
};
export default Form;