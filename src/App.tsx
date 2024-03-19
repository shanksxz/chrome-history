import { useEffect, useState } from "react"

const App = () => {

  const [history, setHistory] = useState<chrome.history.HistoryItem[]>([]);
  const [text, setText] = useState<string>('');


  // initial load
  useEffect(() => {
    chrome.history.search({text: ''}, (results) => {
      setHistory(results);
    });
  }, []);

  // search
  useEffect(() => {
    chrome.history.search({text: text}, (results) => {
      setHistory(results);
    });
  }, [text]);

  return (
    <div>
      <h1>History</h1>
      <div>
        <form className="flex p-2 gap-5" action="">
          <input 
            type="text" 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Search history"/>
            <button className='p-2 rounded-sm'>Search</button>
        </form>

        <div>
          <ul>
            {history.map((item, index) => (
              <li key={index}>
                <a href={item.url} target="_blank" rel="noreferrer">{item.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App  