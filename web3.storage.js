 import { Web3Storage, getFilesFromPath } from 'web3.storage'
  
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDI3ZDMxYzdBOTJCNDA1QjcyQ2U4M2M5QkE5NjliMjkzMTQ0NGQxN2EiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTQxNTgyMjMyNDMsIm5hbWUiOiJ0ZXN0In0.3cKPOvjiHCfrwFQEvLnmkJkJhmpTlJHbprCtkt7E0pY";
  const client = new Web3Storage({ token })
  
  async function storeFiles () {
    const files = await getFilesFromPath('hi.mp4')
   const cid = await client.put(files)
   console.log(cid)
 }
 
 storeFiles()