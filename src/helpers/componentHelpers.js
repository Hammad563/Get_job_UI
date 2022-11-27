import DOMPurify from 'dompurify';
import moment from "moment";

export const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

export const salaryHelper = (salaryArray) => {
    if(salaryArray && salaryArray.length > 1){  
        return `$${salaryArray[0].toLocaleString()} - ${salaryArray[1].toLocaleString()}`;
    }else if(salaryArray && salaryArray.length == 1){
        return `$${salaryArray[0].toLocaleString()}`;
    } else if(salaryArray && salaryArray.length == 0){
        return null;
    }
}

export const date_formater = (date, type) => {
    if(type == "date_only"){
        return moment(date).format("YYYY/MM/DD")
    }else if(type == "date_time") return moment(date).format("YYYY/MM/DD, h:mm a")
}


