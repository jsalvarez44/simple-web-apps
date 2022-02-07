import React from 'react' 
import { ThemeProvider } from '@material-ui/core/styles'
import { createThemeByMode } from './styles/theme'
import { Paper } from '@material-ui/core'

import AppBar from './components/AppBar/AppBar'
import DataTable from './components/DataTable/DataTable'

const App = () => {

  const [universities, setUniversities] = React.useState([])
  const [darkMode, setDarkMode] = React.useState(true)

  const handleToggleTheme = () => setDarkMode(current => !current)

  React.useEffect(() => {
    const init = async () => {
      const universitiesResults = await fetch("http://universities.hipolabs.com/search?country=Ecuador")
      setUniversities((await universitiesResults.json()))
    }
    init()
  }, [])

  return (
    <ThemeProvider theme={createThemeByMode(darkMode ? true : false)}>
      <Paper square className="w-screen h-screen flex flex-col">
        <AppBar
          onToggleTheme={handleToggleTheme}
          darkMode={darkMode}
        />
        <div className="w-full flex-grow overflow-hidden flex">
          <DataTable
            universities={universities}
          />
        </div>
      </Paper>
    </ThemeProvider>
  )
}

export default App
