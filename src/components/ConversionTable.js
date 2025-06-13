import React from "react";

class ConversionTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            baseCurrency: 'USD',
            rates: {}, 
            currencies: [],
            currencyList: []
        }

    this.fetchcurrencyList = this.fetchcurrencyList.bind(this);
    this.fetchRates = this.fetchRates.bind(this);
    this.handleBaseCurrency = this.handleBaseCurrency.bind(this);
    this.updateTable = this.updateTable.bind(this);
    }

    componentDidMount() {
        this.fetchcurrencyList()
        this.fetchRates(this.state.baseCurrency);
    }

    fetchcurrencyList() {
        fetch('https://api.frankfurter.app/currencies')
        .then(response => response.json())
        .then(data => {
            this.setState({
                currencyList: Object.keys(data)
            });
        })
        .catch(error => {
            console.log(`Error fetching currency list`);
        })
    }

    fetchRates(currency) {
        fetch(`https://api.frankfurter.dev/v1/latest?base=${currency}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ 
                    baseCurrency: data.base,
                    rates: data.rates,
                    currencies: Object.keys(data.rates)
                });
                console.log(`Fetched rates for ${data}:`, this.state.currencies);
            })
            .catch(error => {
                console.error('Error fetching currency data:', error);
            });
    }

    updateTable(){

    }

    handleBaseCurrency(e) {
        let selectedCurrency = e.target.value;
        this.fetchRates(selectedCurrency);
    }

    render(){
        return(
            <div className='content'>
                <div id='tableSelector'>
                    <h2>Base Currency: 1 </h2>
                    <select name="baseCurrency" id="baseCurrency" value={this.state.baseCurrency} onChange={this.handleBaseCurrency}>
                        {this.state.currencyList.map((currency, index)=>{
                            return <option key={index} value={currency}>{currency}</option>;
                        })}
                    </select>
                </div>
                <div id='conversionTable'>
                    <table class="table table-striped">
                        <thead>
                            <tr class="">
                            <th scope="col">CURRENCY</th>
                            <th scope="col">VALUE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(this.state.currencies).map(([key, value]) => {
                                return (
                                    <tr>
                                        <th scope="row">{value}</th>
                                        <td>{this.state.rates[value]}</td>
                                    </tr>
                                )
                            })}
                            
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }   
}

export default ConversionTable;
