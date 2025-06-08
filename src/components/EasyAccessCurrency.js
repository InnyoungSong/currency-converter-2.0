import React from "react";

class EasyAccessCurrency extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currency: props.currency,
            rate: props.rate
        };

        this.fetchRate = this.fetchRate.bind(this);
    }

    componentDidMount() {
        this.fetchRate(this.state.currency);
    }

    fetchRate(currency) {
        fetch(`https://api.frankfurter.dev/v1/latest?base=USD`)
            .then(response => response.json())
            .then(data => {
                this.setState({ rate: data.rates[this.state.currency] || 1 });
                console.log(`Fetched rate for ${currency}:`, this.state.rate);
            })
            .catch(error => {
                console.error('Error fetching currency data:', error);
            });
    }

    render() {
        return (
            <div class='easy-access-currency'>
                <h3>{this.state.currency}</h3>
                <p>Rate: {this.state.rate}</p>
            </div>
        );
    }
}

EasyAccessCurrency.defaultProps = {
    currency: 'USD',
    rate: 1
};




export default EasyAccessCurrency