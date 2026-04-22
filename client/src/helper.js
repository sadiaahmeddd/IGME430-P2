export const sendPost = async (url, data) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    const contentType = response.headers.get('content-type');
  
    if (response.status === 204) {
      return { status: 204 };
    }
  
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }
  
    return {};
  };
  
  export const getJSON = async (url) => {
    const response = await fetch(url);
    return response.json();
  };