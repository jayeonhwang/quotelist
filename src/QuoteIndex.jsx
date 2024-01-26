import { useState, useEffect } from "react"

export function QuoteIndex() {
  const [quotes, setQuotes] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredQuotes, setFilteredQuotes] = useState(quotes)
  const itemsPerPage = 15;

  //fetch quotes

  const getQuote = async () => {
    try {
      const response = await fetch("https://gist.githubusercontent.com/benchprep/dffc3bffa9704626aa8832a3b4de5b27/raw/quotes.json");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  //pagenation
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage
  const currentItems = quotes.slice(startIndex, endIndex)

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
    console.log('currentPage:', currentPage)
  }

  const handleNextPage = () => {
    const totalPages = Math.ceil(quotes.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      console.log('currentPage:', currentPage);
    }
  };

  //filter between game and movies

  const handleFilter = (event) => {
    const value = event.target.value
    const filtered = quotes.filter(quote => quote.theme.includes(value));
    setFilteredQuotes(filtered)
  }


  return (
    <div>
      <p>Qoute Index</p>
      <ul>
        <div>
          <input type="text" onChange={handleFilter} />
          {filteredQuotes.map(quote => (
            <div key={quote.source}>
              <p><b>"{quote.quote}"</b></p>
              <p>{quote.source}</p>
              <p>{quote.theme}</p>
              <hr />
            </div>
          ))}
        </div>
        {currentItems.map(item => (
          <div key={item.source}>
            <p><b>"{item.quote}"</b></p>
            <p>{item.source}</p>
            <hr />
          </div>
        ))}
      </ul>
      <button onClick={handlePreviousPage}>Previous</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  )
}