import { isRejected } from "@reduxjs/toolkit";

export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' }
    });
    const data = await response.json();
    resolve({ data })
  }
  );
}
export function logInUser(signinuserData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/auth/signin', {
        method: 'POST',
        body: JSON.stringify(signinuserData),
        headers: { 'content-type': 'application/json' }
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      }
      else {
        const error = await response.text();
        reject(error);
      }

    }
    catch (error) {
      reject(error);
    }
  }
  );
}
export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/auth/check');
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      }
      else {
        const error = await response.text();
        reject(error);
      }

    }
    catch (error) {
      reject(error);
    }
  }
  );
}

export function signOut(userId) {
  return new Promise(async (resolve) => {
    resolve({ data: 'success' })
  }
  );
}

export function resetPasswordRequest(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/auth/reset-password-request', {
        method: 'POST',
        body: JSON.stringify({email}),
        headers: { 'content-type': 'application/json' }
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      }
      else {
        const error = await response.text();
        reject(error);
      }

    }
    catch (error) {
      reject(error);
    }
  }
  );
}

export function resetPasswordRequestUser(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/auth/reset-password-request-user', {
        method: 'POST',
        body: JSON.stringify({email}),
        headers: { 'content-type': 'application/json' }
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      }
      else {
        const error = await response.text();
        reject(error);
      }

    }
    catch (error) {
      reject(error);
    }
  }
  );
}

export function resetPassword(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      }
      else {
        const error = await response.text();
        reject(error);
      }

    }
    catch (error) {
      reject(error);
    }
  }
  );
}
export function resetPasswordUser(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/auth/reset-password-user', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      }
      else {
        const error = await response.text();
        reject(error);
      }

    }
    catch (error) {
      reject(error);
    }
  }
  );
}




