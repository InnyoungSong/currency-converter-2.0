import React from "react";
import CurrencyHandler from "../components/CurrencyHandler";
import EasyAccessCurrency from "../components/EasyAccessCurrency";

function Converter() {
    return (
    <div className="contents mt-5">
        <CurrencyHandler />

        <div id='easyAccess'>
            <h2>Exchange rates at a quick glance</h2>
            <span>Base currency - 1 USD</span>
            <div id='easyAccessCurrencies'>
                <EasyAccessCurrency currency='CAD'/>
                <EasyAccessCurrency currency='KRW'/>
                <EasyAccessCurrency currency='EUR'/>
                <EasyAccessCurrency currency='JPY'/>
            </div>
        </div>
    </div>
    )
}

export default Converter;