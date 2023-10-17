import { GetLocalStorage } from '../localStorage/GetLocalStorage';


const Account = () => {

  const dataComplete = { ...GetLocalStorage()};
  console.log(dataComplete);
  return (
    <div>Account</div>
  )
}

export default Account