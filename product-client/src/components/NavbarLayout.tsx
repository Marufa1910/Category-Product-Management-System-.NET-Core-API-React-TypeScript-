import {Link, Outlet} from 'react-router-dom'

export default function NavbarLayout() {
  return (<>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand d-flex align-items-center fw-bold fs-4">
            <i className="bi bi-box-seam me-2"></i> Product Management
          </Link>
          <div className="d-flex ms-auto">
            <Link to="/" className="btn btn-outline-light btn-sm me-2">
              <i className="bi bi-list-ul me-1"></i> View Categories
            </Link>
            <Link to="/categories/new" className="btn btn-light btn-sm">
              <i className="bi bi-plus-circle me-1"></i> Add Category
            </Link>
          </div>
        </div>
      </nav>
      <div className="container"><Outlet /></div>
    </>
  );
}