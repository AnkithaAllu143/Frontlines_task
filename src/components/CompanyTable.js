export default function CompanyTable({ companies }) {
  return (
    <table className="company-table">
      <thead>
        <tr>
          <th>Name</th><th>Industry</th><th>Location</th><th>Employees</th><th>Revenue</th>
        </tr>
      </thead>
      <tbody>
        {companies.map(c => (
          <tr key={c.id}>
            <td>{c.name}</td>
            <td>{c.industry}</td>
            <td>{c.location}</td>
            <td>{c.employees}</td>
            <td>₹{Number(c.revenue).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
