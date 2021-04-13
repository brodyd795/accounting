import {homeRepository} from '../repositories/home-repository';

export const homeService = async () => {
    const data = await homeRepository();

    return data;
};
