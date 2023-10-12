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