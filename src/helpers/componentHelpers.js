import DOMPurify from 'dompurify';

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


