/* eslint-disable */
import { reshapeBadCourseTable } from 'plugins/guetsdk/structures';

const TEST_DATA = {
    1: {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
    },
    2: {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
    },
    3: {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
    },
    4: {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
    },
    5: {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
    },
};

describe('reshapeBadCourseTable', () => {
    it('should return correct course martix', () => {
        let result = reshapeBadCourseTable(TEST_DATA);
        expect(result).toMatchSnapshot();
    });

});
