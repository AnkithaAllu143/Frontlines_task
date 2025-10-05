export default function Pagination({ total, page, pageSize, setPage }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pages = [];
  for (let p = 1; p <= totalPages; p++) pages.push(p);

  return (
    <div className="pagination">
      <button onClick={()=>setPage(Math.max(1, page-1))} disabled={page===1}>Prev</button>
      {pages.map(p => (
        <button key={p} className={p===page ? 'active': ''} onClick={()=>setPage(p)}>{p}</button>
      ))}
      <button onClick={()=>setPage(Math.min(totalPages, page+1))} disabled={page===totalPages}>Next</button>
    </div>
  );
}
