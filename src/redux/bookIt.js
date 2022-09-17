import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const getUrl = 'https://api.itbook.store/1.0/new';

const FETCHED_BOOKS = 'FETCHED_BOOKS';
const JOIN_OR_LEAVE_MISSION = 'JOIN_OR_LEAVE_MISSION';

export const getBooksIt = createAsyncThunk(
    FETCHED_BOOKS,
  async () => {
    const bookItArr = [];
    await fetch(getUrl).then((booksIt) => booksIt.json())
      .then((res) => res.forEach((bookIt) => {
        const {} = bookIt
        bookItArr.push({
          bookIt_id: bookIt.isbn13,
          title: bookIt.title,
          subtitle: bookIt.subtitle,
          price: bookIt.price,
          image: bookIt.image,
          url: bookIt.url,
        });
      }));
    return (bookItArr);
  },
);

const getBookUrl = 'https://api.itbook.store/1.0/books/';

export const getBookIt = createAsyncThunk(
    FETCHED_BOOKS,
    async (isbn13) => {
        const bookItArr = [];
        await fetch(`${getBookUrl}${isbn13}`).then((bookIt) => bookIt.json())

        .then((res) => {
            const { author, publisher, pages, year, rating, desc, pdf } = res;
            bookItArr.push({
                bookIt_id: isbn13,
                author,
                publisher,
                pages,
                year,
                rating,
                desc,
                pdf,
            });
        return (bookItArr);
        });
    },
);

const bookItSlice = createSlice({
    name: 'bookIt',
    initialState: {
        bookIt: [],
        bookItDetails: [],
    },
    extraReducers: {
        [getBooksIt.fulfilled]: (state, action) => {
            state.bookIt = action.payload;
        },
        [getBookIt.fulfilled]: (state, action) => {
            state.bookItDetails = action.payload;
        },
    },
});

export default bookItSlice.reducer;
