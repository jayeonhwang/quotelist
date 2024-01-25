import { useState, useEffect } from "react"
import axios from "axios"

export function QuoteIndex() {
  const [quotes, setQuotes] = useState([])

  const getQuote = () => {
    console.log("getQuote")
    axios.get("https://gist.githubusercontent.com/benchprep/dffc3bffa9704626aa8832a3b4de5b27/raw/quotes.json").then(
      response => {
        console.log(response.data)
        setQuotes(response.data)
      })
  }

  useEffect(getQuote, []);


  return (
    <div>
      <p>Qoute Index</p>
      {quotes.map(quote => (
        <div>
          <p>{quote.quote}</p>
        </div>
      ))}
    </div>
  )
}