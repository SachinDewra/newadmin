import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import authHeader from '../services/auth-header';
// Create Thunk
export const fetchBoards = () => (dispatch) => {
    dispatch(boardsLoading(true));
    return fetch(baseUrl + 'admin/boards', {
                    method: "GET",
                    headers: authHeader()
                })
                .then(response => {
                    if(response.ok) {
                        return response;
                    }
                    else {
                        var error = new Error('Error: ' + response.status + ': '+ response.statusText);
                        error.response = response;
                        throw error;
                    }
                },
                error => {
                    var errmess = new Error(error.message)
                    throw errmess
                })
                .then(response => response.json())
                .then(boards => dispatch(addBoards(boards)))
                .catch(error => dispatch(boardsFailed(error.message)));
}

export const boardsLoading = () => ({
    type: ActionTypes.BOARDS_LODING
})

export const boardsFailed = (errmess) => ({
    type: ActionTypes.BOARDS_FAILED,
    payload: errmess
})

export const addBoards = (boards) => ({
    type: ActionTypes.ADD_BOARDS,
    payload: boards
})

export const postBoard = (name, short_name, position, image, status) => (dispatch) => {
    const newBoard = new FormData();
    newBoard.append("image", image);
    newBoard.append("name", name);
    newBoard.append("short_name", short_name);
    newBoard.append("position", position);
    newBoard.append("status", status);

    return fetch(baseUrl + 'admin/add-board', {
        method: 'POST',
        body: newBoard,
        headers: authHeader(),
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok) {
            return response;
        }
        else {
            var error = new Error('Error: ' + response.status + ': '+ response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message)
        throw errmess
    })
    .then(response => response.json())
    .then(response => {dispatch(addNewBoard(response));
        return response;
    })
    .catch(error => {console.log('Post Board', error.message);
            return ({"status":false,"message":error.message})})
    
}

export const addNewBoard = (board) => ({
    type: ActionTypes.ADD_NEWBOARD,
    // send back
    payload: board
});

export const deleteBoard = (boardid) => (dispatch) => {
    const board = {
        boardId: boardid,
    }
    var header = {
        'Content-Type': 'application/json',
        'Authorization': authHeader().Authorization
    }
    return fetch(baseUrl + 'admin/delete-board', {
        method: 'POST',
        body: JSON.stringify(board),
        headers: header,
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok) {
            return response;
        }
        else {
            var error = new Error('Error: ' + response.status + ': '+ response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message)
        throw errmess
    })
    .then(response => response.json())
    .then(response => {dispatch(fetchBoards());
        return response;
    })
    .catch(error => {console.log('Post Board', error.message);
            return ({"status":false,"message":error.message})})
    
}

export const editBoard = (name, short_name, position, image, status,boardid) => (dispatch) => {
    const newBoard = new FormData();
    newBoard.append("name", name);
    newBoard.append("short_name", short_name);
    newBoard.append("position", position);
    newBoard.append("status", status);
    newBoard.append("boardId", boardid);
    var url = 'admin/edit-board';
    if(image) {
        url = 'admin/edit-board-withimage';
        newBoard.append("image", image);
    }
    return fetch(baseUrl + url, {
        method: 'POST',
        body: newBoard,
        headers: authHeader(),
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok) {
            return response;
        }
        else {
            var error = new Error('Error: ' + response.status + ': '+ response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message)
        throw errmess
    })
    .then(response => response.json())
    .then(response => {dispatch(fetchBoards(response));
        return response;
    })
    .catch(error => {console.log('Post Board', error.message);
            return ({"status":false,"message":error.message})})
    
}


// Subject
export const fetchSubject = () => (dispatch) => {
    dispatch(subjectsLoading(true));
    return fetch(baseUrl + 'admin/subjects', {
                    method: "GET",
                    headers: authHeader()
                })
                .then(response => {
                    if(response.ok) {
                        return response;
                    }
                    else {
                        var error = new Error('Error: ' + response.status + ': '+ response.statusText);
                        error.response = response;
                        throw error;
                    }
                },
                error => {
                    var errmess = new Error(error.message)
                    throw errmess
                })
                .then(response => response.json())
                .then(subjects => dispatch(addSubjects(subjects)))
                .catch(error => dispatch(subjectsFailed(error.message)));
}

export const subjectsLoading = () => ({
    type: ActionTypes.SUBJECT_LODING
})

export const subjectsFailed = (errmess) => ({
    type: ActionTypes.SUBJECT_FAILED,
    payload: errmess
})

export const addSubjects = (subjects) => ({
    type: ActionTypes.ADD_SUBJECT,
    payload: subjects
})

export const postSubject = (name, position, image, status) => (dispatch) => {
    const newData = new FormData();
    newData.append("image", image);
    newData.append("name", name);
    newData.append("position", position);
    newData.append("iastatus", status);

    return fetch(baseUrl + 'admin/add-subject', {
        method: 'POST',
        body: newData,
        headers: authHeader(),
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok) {
            return response;
        }
        else {
            var error = new Error('Error: ' + response.status + ': '+ response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message)
        throw errmess
    })
    .then(response => response.json())
    .then(response => {dispatch(addNewSubject(response));
        return response;
    })
    .catch(error => {console.log('Post Subject', error.message);
            return ({"status":false,"message":error.message})})
    
}

export const addNewSubject = (board) => ({
    type: ActionTypes.ADD_NEWSUBJECT,
    // send back
    payload: board
});

export const deleteSubject = (id) => (dispatch) => {
    const s = {
        SubjectId: id,
    }
    var header = {
        'Content-Type': 'application/json',
        'Authorization': authHeader().Authorization
    }
    return fetch(baseUrl + 'admin/delete-subject', {
        method: 'POST',
        body: JSON.stringify(s),
        headers: header,
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok) {
            return response;
        }
        else {
            var error = new Error('Error: ' + response.status + ': '+ response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message)
        throw errmess
    })
    .then(response => response.json())
    .then(response => {dispatch(fetchSubject());
        return response;
    })
    .catch(error => {console.log('Post Subject', error.message);
            return ({"status":false,"message":error.message})})
    
}

export const editSubject = (name, position, image, status,id) => (dispatch) => {
    const newData = new FormData();
    newData.append("name", name);
    newData.append("position", position);
    newData.append("iastatus", status);
    newData.append("SubjectId", id);
    var url = 'admin/edit-subject';
    if(image) {
        url = 'admin/edit-subject-withimage';
        newData.append("image", image);
    }
    return fetch(baseUrl + url, {
        method: 'POST',
        body: newData,
        headers: authHeader(),
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok) {
            return response;
        }
        else {
            var error = new Error('Error: ' + response.status + ': '+ response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message)
        throw errmess
    })
    .then(response => response.json())
    .then(response => {dispatch(fetchSubject(response));
        return response;
    })
    .catch(error => {console.log('Post Subject', error.message);
            return ({"status":false,"message":error.message})})
    
}

