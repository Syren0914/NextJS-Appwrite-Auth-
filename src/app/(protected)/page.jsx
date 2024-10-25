import axiosInstance from "@/lib/axiosInstance";


export default async function Home() {
  
  const response = await axiosInstance({
    url:"http://localhost:3000/api/orders",
    method: "get"
  })
  const {orders} = response.data
  
  return (
    
    
      <main className="container mx-auto max-w-[800px]">
        <div id="orders-container">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Status</th>
                
                <th>Total</th>

              </tr>
            </thead>
            <tbody>
              {orders.map(order =>(
                <tr key={order.$id}>
                  <td>
                    <strong>{order.customer}</strong>
                    <p>{order.customer_email}</p>  
                  </td>
                  
                  
                  <td>{order.status}</td>
                  <td>{order.amount}</td>
                  
                  

                </tr>

              ))}
              
            </tbody>
          </table>
        </div>
      </main>
    
  );
}
