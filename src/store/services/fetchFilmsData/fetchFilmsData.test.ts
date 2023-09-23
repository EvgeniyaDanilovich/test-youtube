import { Film } from '../../types/filmTypes';
import { fetchFilmsData } from './fetchFilmsData';
import 'jest';
import { Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from '../../store';

const mockFilm: Film = {
    id: 1,
    name: '1+1',
    genres: [{ name: 'драма' }],
    premiere: { russia: '2020', world: '2020' },
    poster: { url: 'url' },
    videos: { trailers: [{ url: 'url' }] },
};

global.fetch = jest.fn();
const mockedFetch = fetch as any;

describe('fetchFilmsDataThunk', () => {
    let dispatch: Dispatch;
    let getState: () => StateSchema;

    beforeEach(() => {
        dispatch = jest.fn();
        getState = jest.fn();
    });

    test('should fetch fetchFilmsData with resolved response', async () => {
        mockedFetch.mockResolvedValue({
            ok: true,
            json: () => (Promise.resolve({ docs: [mockFilm] }))
        });

        const action = fetchFilmsData(1);
        const result = await action(dispatch, getState, undefined);
        // expect(mockedFetch.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual([mockFilm]);
    });

    test('should fetch fetchFilmsData with resolved response', async () => {
        mockedFetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ docs: [mockFilm] })
        });

        const dispatch = jest.fn();
        const thunk = fetchFilmsData(1);

        await thunk(dispatch, getState, '');

        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(2);

        const [start, end] = calls;
        expect(start[0].type).toBe(fetchFilmsData.pending.type);
        expect(end[0].type).toBe(fetchFilmsData.fulfilled.type);
        expect(end[0].payload).toEqual([mockFilm]);
    });

    test('should fetch fetchFilmsData with rejected response', async () => {
        mockedFetch.mockResolvedValue({
            ok: false,
        });

        const dispatch = jest.fn();
        const thunk = fetchFilmsData(1);

        await thunk(dispatch, getState, '');

        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(2);

        const [start, end] = calls;
        console.log(end);
        expect(start[0].type).toBe(fetchFilmsData.pending.type);
        expect(end[0].type).toBe(fetchFilmsData.rejected.type);
        expect(end[0].payload).toBe('Can\'t fetch');
    });
});