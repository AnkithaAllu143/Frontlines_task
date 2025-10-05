export default function CompanyCard({ company }) {
  return (
    <div className="company-card">
      <h3>{company.name}</h3>
      <p>{company.industry} • {company.location}</p>
      <p>Employees: {company.employees}</p>
      <p>Revenue: ₹{Number(company.revenue).toLocaleString()}</p>
    </div>
  );
}
