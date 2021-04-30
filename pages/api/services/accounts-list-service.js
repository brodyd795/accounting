import {withTransactionWrapper} from '../repositories/transaction-wrapper-repository';
import {accountsListRepository} from '../repositories/accounts-list-repository';
import {transactionCategories} from '../../../enums/transaction-categories';
import {cleanAccountNameOrCategoryForUI} from '../../../utils/string-helpers';

const accountsList = async () => {
    const data = await accountsListRepository();

    const options = Object.values(transactionCategories).map((category) => ({
        label: category,
        options: data
            .filter((account) => account.category === category)
            .map((account) => ({
                accountId: account.accountId,
                label: cleanAccountNameOrCategoryForUI(account.accountName),
                value: account.accountName
            }))
    }));

    return options;
};

export const accountsListService = (props) => withTransactionWrapper(accountsList, props);
