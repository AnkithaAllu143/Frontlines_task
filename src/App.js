import React, { useEffect, useState, useContext } from 'react';
import { FiltersProvider, FiltersContext } from './context/FiltersContext';
import { fetchCompanies } from './api/companiesApi';
import Filters from './components/Filters';
import Loading from './components/Loading';
import CompanyCard from './components/CompanyCard';
import CompanyTable from './components/CompanyTable';
import Pagination from './components/Pagination';
import './styles.css';

function CompaniesView() {
  const { search, location, industry, sortBy, view, pageSize, page, setPage } = useContext(FiltersContext);

  const [companies, setCompanies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetchCompanies(controller.signal)
      .then(data => {
        setCompanies(data);
        setLoading(false);
      })
      .catch(err => {
        if (err.name !== 'AbortError') setError(err.message);
        setLoading(false);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!companies.length) { setFiltered([]); return; }
    let arr = companies.slice();

  
    if (search && search.trim()) {
      const s = search.trim().toLowerCase();
      arr = arr.filter(c => c.name.toLowerCase().includes(s));
    }
  
    if (location && location !== 'All') arr = arr.filter(c => c.location === location);
  
    if (industry && industry !== 'All') arr = arr.filter(c => c.industry === industry);


    if (sortBy === 'name-asc') arr.sort((a,b)=>a.name.localeCompare(b.name));
    if (sortBy === 'name-desc') arr.sort((a,b)=>b.name.localeCompare(a.name));
    if (sortBy === 'revenue-desc') arr.sort((a,b)=>b.revenue - a.revenue);
    if (sortBy === 'revenue-asc') arr.sort((a,b)=>a.revenue - b.revenue);

    setFiltered(arr);
    setPage(1); 
  }, [companies, search, location, industry, sortBy]);

  if (loading) return <Loading />;
  if (error) return <div className="error">Error: {error}</div>;
  if (!companies.length) return <div>No companies found.</div>;

    const total = filtered.length;
  const start = (page - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  return (
    <div>
      <Filters companies={companies} />
      <div className="results-summary">Showing {pageItems.length} of {total} companies</div>

      {view === 'cards' ? (
        <div className="cards-grid">
          {pageItems.map(c => <CompanyCard key={c.id} company={c} />)}
        </div>
      ) : (
        <CompanyTable companies={pageItems} />
      )}

      <Pagination total={total} page={page} pageSize={pageSize} setPage={setPage} />
    </div>
  );
}

export default function App(){
  return (
    <FiltersProvider>
      <div className="app">
        <h1>Companies Directory</h1>
        <CompaniesView />
      </div>
    </FiltersProvider>
  );
}
