import { Char } from 'app/interfaces/models/Char'
import axios from 'axios'
import { HttpRequest } from '../../../../http/HttpRequest'

const CharService = {

  async revenue(month: any, year: any): Promise<Char | null> {
    // console.log(month, year)
    const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/analytics/order/revenue/${month}/${year}`)
    return response
  },
  async compareCreateSuccess(month: any, year: any): Promise<{ message: string } | null> {
    const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/analytics/order/compare/create/success/${month}/${year}`)
    return response
  },
  async ExportOrderRevenue(month: any, year: any): Promise<void> {
    // console.log(month, year, type)
    const authToken = localStorage.getItem("ACCESS_TOKEN_KEY")
    // const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/export/order/revenue/${month}/${year}/${type}`,{},{responseType:'blob'})
    axios({
      url: `http://127.0.0.1:8000/api/admin/export/order/revenue/${month}/${year}`, //your url
      method: 'GET',
      responseType: 'blob',
      headers: { "Authorization": `Bearer ${authToken?.replaceAll('"', '')}` }
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      // console.log(url)
      link.setAttribute('download', `file.xlsx`); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
    // return response
  },
  async ExportCompareCreateSuccess(month: any, year: any): Promise<void> {
    // const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/export/order/compare/create/success/${month}/${year}/${type}`)
    // return response
    const authToken = localStorage.getItem("ACCESS_TOKEN_KEY")
    axios({
      url: `http://127.0.0.1:8000/api/admin/export/order/compare/create/success/${month}/${year}`, //your url
      method: 'GET',
      responseType: 'blob',
      headers: { "Authorization": `Bearer ${authToken?.replaceAll('"', '')}` }
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `file.xlsx`); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  },
  async quantityProduct(data: object): Promise<{ message: string } | null> {
    const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/analytics/quantity/product`, data)
    return response
  },
  async ExportQuantityProduct(data: object): Promise<{ message: string } | null> {
    const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/export/quantity/product`, data,
      { responseType: 'blob' })
    const link = document.createElement('a');
    const url = window.URL.createObjectURL(new Blob([response.data]));
    link.href = url
    link.setAttribute('download', `file.xlsx`);
    document.body.appendChild(link);
    link.click();
    return response
  }

  // async ExportQuantityProduct(data: object): Promise<void> {

  //   const authToken = localStorage.getItem("ACCESS_TOKEN_KEY")
  //   axios({
  //     url: `http://127.0.0.1:8000/api/admin/export/quantity/product`,
  //     method: 'GET',
  //     responseType: 'blob',
  //     headers: { "Authorization": `Bearer ${authToken?.replaceAll('"', '')}` }
  //   }).then((response) => {
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', `download`); //or any other extension
  //     document.body.appendChild(link);
  //     link.click();
  //   });
  // }




}
export default CharService
