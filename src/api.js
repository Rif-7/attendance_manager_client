const api_url = 'http://localhost:4000';

const get_item_list = async name => {
  try {
    let response = await fetch(`${api_url}/${name}`, {
      method: 'GET',
      mode: 'cors',
    });

    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: 'Error' };
  }
};

export { get_item_list };
