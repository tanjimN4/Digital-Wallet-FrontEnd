const Transactions = () => (
  <div>
    <h1>Transaction History</h1>
    <p>View all your transactions with filters and pagination</p>
    {/* Placeholder table */}
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2025-08-27</td>
          <td>Send</td>
          <td>$50</td>
          <td>Success</td>
        </tr>
      </tbody>
    </table>
  </div>
);
export default Transactions;