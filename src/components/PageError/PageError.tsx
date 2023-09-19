import React, { memo } from 'react';
import { PageErrorWrapper, ErrorText, ErrorButton } from './styled';

export const PageError = memo(() => {
    const onReload = () => {
        location.reload();
    };

    return (
        <PageErrorWrapper>
            <ErrorText>
                Что-то пошло не так.
            </ErrorText>
            <ErrorButton onClick={onReload}>Перезагрузите страницу</ErrorButton>
        </PageErrorWrapper>
    );
});
