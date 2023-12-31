import axios from 'axios';

const API = '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-';
// const API = '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';
// const API = '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';

export const client = axios.create({
  headers: {
    Authorization: `Bearer ${API}`,
    'content-type': 'application/json',
  },
});

export const openAi = async (prompt, messages) => {
  try {

    return gpt3(prompt, messages || []);
  } catch (err) {
    console.log('err in aoopne ai api 40', err);
    return Promise.resolve({success: false, message: err.message});
  }
};

const gpt3 = async (prompt, messages) => {
  console.log('messages in gpt3', messages);
  try {
    const result = await client.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages,
      },
    );
    console.log(result, 'result in gpt3');
    let response = result.data?.choices[0]?.message?.content;
    messages.push({role: 'assistant', content: response.trim()});

    return Promise.resolve({success: true, data: messages});
  } catch (error) {
    console.log('err in aoopne ai api 59', error.message);
    return Promise.resolve({success: false, message: error.message});
  }
};

const dalle = async (prompt, messages) => {
  try {
    const result = await client.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt,
        n: 1,
        size: '512x512',
      },
    );

    const uri = result?.data?.data[0]?.url;
    console.log('image rurkkkk', uri);
    messages.push({role: 'assistant', content: uri});
    return Promise.resolve({success: true, data: messages});
  } catch (error) {
    console.log('err in aoopne ai api 80', error.message);
    return Promise.resolve({success: false, message: error.message});
  }
};
