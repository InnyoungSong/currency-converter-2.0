import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import arrowIcon from '../icons/arrows.svg';

class CurrencyHandler extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        currencies: [],
        currency1: {
            base: 'USD',
            amount: 0,
            rates: {}
        },
        currency2: {
            base: 'CAD',
            amount: 0,
            rates: {}
        },
        hasError: false,
        }

        this.handleCurrency = this.handleCurrency.bind(this); 
       // this.handleAmount = this.handleAmount.bind(this);
        this.fetchCurrencyData = this.fetchCurrencyData.bind(this);
        this.updateAmount = this.updateAmount.bind(this);
        this.convertAmount = this.convertAmount.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        fetch('https://api.frankfurter.app/currencies')
            .then(response => response.json())
            .then(data => {
                const currencyKeys = Object.keys(data);
                this.setState({
                    currencies: currencyKeys,
                });
            })
            .catch(error => {
                console.error('Error fetching currencies:', error);
                this.setState({hasError: true});
            });  
        Promise.all([
            this.fetchCurrencyData('currency1', 'USD'),
            this.fetchCurrencyData('currency2', 'CAD')
        ]).then(() => {
            console.log(this.state.currency1, this.state.currency2);
            this.initialSetup(); // Only runs after both fetches complete
        });
    }


    fetchCurrencyData(currObject, base){
        return fetch(`https://api.frankfurter.dev/v1/latest?base=${base}`)
            .then(response => response.json())
            .then(data => {
                console.log(`Fetched for ${currObject}:`, data);
                this.setState(prevState => ({
                    [currObject]: {
                        ...prevState[currObject],
                        base: data.base,
                        rates: data.rates
                    }
                }))
            })
            .catch(error => {
                console.error('Error fetching currencies:', error);
            });
    }

    initialSetup(){
        let cadAmount = this.state.currency1.rates['CAD'];
        this.setState(prevState => ({
            currency2: {
                ...prevState.currency2,
                amount: cadAmount
            }
        }));
//        console.log(this.state.currency1, this.state.currency1.rates['CAD']);
    }

    handleCurrency(event){
        const newCurrency = event.target.value;
        let currObj = '';
        let targetCurr = '';
        if (event.target.id === 'curr1') {
            currObj = 'currency1';
            targetCurr = 'currency2';
        } else if (event.target.id === 'curr2') {
            currObj = 'currency2';
            targetCurr = 'currency1';
        }
        
        let baseAmount = this.state[currObj].amount;
        this.fetchCurrencyData(currObj, newCurrency);
        this.updateAmount(event);
        this.convertAmount(currObj, baseAmount, targetCurr)
    }

    /*handleAmount(event){
        const {value, id} = event.target;
        let currObj = '';
        let targetObj = ''
        if (id === 'amount1' || id === 'curr1'){
            currObj = 'currency1';
            targetObj = 'currency2';
        }else if (id === 'amount2' || id === 'curr2'){
            currObj = 'currency2';
            targetObj = 'currency1';
        } 

        let rates = this.state[currObj].rates;
        console.log('from handleAmount :' + rates)
        let currencyTarget = this.state[targetObj].base;
        let currencyRate = rates[currencyTarget] || 1;
            this.setState(prevState => ({
                [currObj]: {
                    ...prevState[currObj],
                    amount: parseFloat(value) || 1
                },
                [targetObj]: {
                    ...prevState[targetObj],
                    amount: parseFloat(value*currencyRate)  || 1
                }
            }));
        }
    */
    
    updateAmount(event){
        let {value, id} = event.target;
        if (id === 'amount1') {
            this.setState(prevState => ({
                currency1: {
                    ...prevState.currency1,
                    amount: value
                }
            }));
            this.convertAmount('currency1', value, 'currency2');
        }
        else if (id === 'amount2') {
            this.setState(prevState => ({
                currency2: {
                    ...prevState.currency2,
                    amount: value
                }
            }));
            this.convertAmount('currency2', value, 'currency1');
        }
    }    

       /* handleAmount(event){
        const {value, id} = event.target;
        let currObj = '';
        let targetObj = ''
        if (id === 'amount1' || id === 'curr1'){
            this.updateAmount('currency1', value, 'currency2', this.state.currency2.amount);
        }else if (id === 'amount2' || id === 'curr2'){
            this.updateAmount('currency2', value, 'currency1', this.state.currency1.amount);
        } 
        }*/
        
    
    convertAmount(baseCurr, baseAmount, targetCurr){;
        let targetBase = this.state[targetCurr].base;
        let rate = this.state[baseCurr].rates[targetBase];
        let newAmount = parseFloat(baseAmount * rate).toFixed(2) || 0;;
        console.log('from convertAmount: ' + newAmount);
        this.setState(prevState => ({
            [targetCurr]: {
                ...prevState[targetCurr],
                amount: newAmount
            }
        }));
    }

/*    updateAmount = (baseCurrency, baseAmount, targetCurrency, targetAmount) => {
        let baseCurrency = this.state[baseCurrency];
        let baseAmount = this.state[baseAmount];
        let targetCurrency = this.state[targetCurrency];
        let targetAmount = this.state[targetAmount];
        let conversionRate = rate[targetCurrency];

        this.fetchCurrencyData(baseCurrency);
        targetAmount = parseFloat(baseAmount * conversionRate).toFixed(2);

        return
    }
*/
    render(){
        const {currencies, currency1, amount1, currency2, amount2 } = this.state;
        return (
            <div id='currencyHandlers'>
                <div class='currencyHandler'>
                    <select name="currency1" id="curr1" value={this.state.currency1.base} onChange={this.handleCurrency}>
                        {currencies.map((currency, index)=>{
                            return <option key={index} value={currency}>{currency}</option>;
                        })}
                    </select>
                    <input type="number" name="amount1" id="amount1" value={this.state.currency1.amount} onChange={this.updateAmount} />
                </div>
                <img src={arrowIcon} id="arrowIcon" alt="Arrow" width="24" height="24" />

                <div class='currencyHandler'>
                    <select name="currency2" id="curr2" value={this.state.currency2.base} onChange={this.handleCurrency}>
                        {currencies.map((currency, index)=>{
                            return <option key={index} value={currency}>{currency}</option>;
                        })}
                    </select>
                    <input type="number" name="amount2" id="amount2" value={this.state.currency2.amount} onChange={this.updateAmount} />
                </div>
            </div>
        )
    }
}

export default CurrencyHandler;