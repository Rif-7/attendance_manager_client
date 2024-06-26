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
    return { error: { msg: 'Error' } };
  }
};

const create_tutor = async (f_name, l_name) => {
  try {
    let response = await fetch(`${api_url}/tutor`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        f_name,
        l_name,
      }),
    });

    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: { msg: 'Error' } };
  }
};

const create_class = async (
  name,
  current_sem,
  start_year,
  end_year,
  tutor_id
) => {
  try {
    let response = await fetch(`${api_url}/class`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        current_sem,
        start_year,
        end_year,
        tutor_id,
      }),
    });

    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: { msg: 'Error' } };
  }
};

const create_student = async (f_name, l_name, class_id, rollno) => {
  try {
    let response = await fetch(`${api_url}/student`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        f_name,
        l_name,
        class_id,
        rollno,
      }),
    });

    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: { msg: 'Error' } };
  }
};

const create_exam = async (name, date, time, class_id) => {
  try {
    let response = await fetch(`${api_url}/exam`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        name,
        date,
        time,
        class_id,
      }),
    });

    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: { msg: 'Error' } };
  }
};

const get_attendance_data = async exam_id => {
  try {
    const response = await fetch(`${api_url}/exam/${exam_id}/attendance`, {
      method: 'GET',
      mode: 'cors',
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: 'Error' };
  }
};

const mark_attendance = async (exam_id, student_id) => {
  try {
    const response = await fetch(
      `${api_url}/exam/${exam_id}/attendance/${student_id}`,
      {
        method: 'POST',
        mode: 'cors',
      }
    );

    return await response.json();
  } catch (err) {
    return { error: 'Error' };
  }
};

const unmark_attendance = async (exam_id, student_id) => {
  try {
    const response = await fetch(
      `${api_url}/exam/${exam_id}/attendance/${student_id}`,
      {
        method: 'DELETE',
        mode: 'cors',
      }
    );

    return await response.json();
  } catch (err) {
    return { error: 'Error' };
  }
};

export {
  get_item_list,
  create_tutor,
  create_class,
  create_student,
  create_exam,
  get_attendance_data,
  mark_attendance,
  unmark_attendance,
};
