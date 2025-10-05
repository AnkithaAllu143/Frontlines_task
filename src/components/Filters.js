import React, { useContext, useMemo } from 'react';
import { FiltersContext } from '../context/FiltersContext';
import { debounce } from '../utils/debounce';

export default function Filters({ companies }) {
  const { search, setSearch, location, setLocation, industry, setIndustry, sortBy, setSortBy, view, setView, pageSize, setPageSize, setPage } =
    useContext(FiltersContext);

  const locations = useMemo(() => ['All', ...new Set(companies.map(c => c.location))], [companies]);
  const industries = useMemo(() => ['All', ...new Set(companies.map(c => c.industry))], [companies]);

  const onSearch = debounce((e) => {
    setPage(1);
    setSearch(e.target.value);
  }, 300);

  return (
    <div className="filters">
      <input defaultValue={search} onChange={onSearch} placeholder="Search company..." />
      <select value={location} onChange={(e)=>{ setPage(1); setLocation(e.target.value) }}>
        {locations.map(l => <option key={l} value={l}>{l}</option>)}
      </select>
      <select value={industry} onChange={(e)=>{ setPage(1); setIndustry(e.target.value) }}>
        {industries.map(i => <option key={i} value={i}>{i}</option>)}
      </select>
      <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
        <option value="name-asc">Name ↑</option>
        <option value="name-desc">Name ↓</option>
        <option value="revenue-desc">Revenue ↓</option>
        <option value="revenue-asc">Revenue ↑</option>
      </select>
      <select value={pageSize} onChange={(e) => { setPage(1); setPageSize(Number(e.target.value)) }}>
        <option value={5}>5 / page</option>
        <option value={10}>10 / page</option>
        <option value={20}>20 / page</option>
      </select>
      <button onClick={() => setView(view === 'cards' ? 'table' : 'cards')}>
        {view === 'cards' ? 'Table view' : 'Card view'}
      </button>
    </div>
  );
}
