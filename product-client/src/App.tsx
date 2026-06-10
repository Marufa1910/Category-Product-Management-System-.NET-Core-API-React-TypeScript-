import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavbarLayout from './components/NavbarLayout'
import CategoryListPage from './components/CategoryListPage'
import CategoryFormPage from './components/CategoryFormPage'

export default function App() { 

  return (
    <BrowserRouter>
    <Routes>
       <Route path="/" element={<NavbarLayout />}>     
         <Route index element={<CategoryListPage />} />          
          <Route path="categories/new" element={<CategoryFormPage />} />
          <Route path="categories/edit/:id" element={<CategoryFormPage />} />          
        </Route>
    </Routes>
    </BrowserRouter>
  )
}


