import React, { memo } from 'react';
import { PageErrorWrapper } from './styled';

export const PageError = memo(() => {
    const onReload = () => {
        location.reload();
    };

    return (
        <PageErrorWrapper>
            <p>
                Что-то пошло не так
            </p>
            <button onClick={onReload}>Перезагрузите страницу</button>
            {/* <Button onClick={onReload}>Перезагрузите страницу</Button> */}
        </PageErrorWrapper>
    );
});
