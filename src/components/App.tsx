import * as React from 'react';
import styled from 'styled-components';
import { List } from './List';
import { Editor } from './Editor';
import { AdvertData } from './type';
import { STORAGE_KEY } from '..';


export const App = (props) => {
    const [editorStatus, setEditorStatus] = React.useState(false);
    const [items, setItems] = React.useState<AdvertData[]>(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
    const [itemIndex, setItemIndex] = React.useState<undefined | number>(undefined);
    
    const editItems = React.useCallback((data: AdvertData[]) => {
        setItems(data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, [items]);

    const hideEditor = React.useCallback(() => {
        setEditorStatus(false);
        setItemIndex(undefined);
    }, [editorStatus]);

    const showEditor = React.useCallback(() => {
        setEditorStatus(true);
    }, [editorStatus]);
        
    return (
        <Application>
            <List
                items={items}
                onEdit={editItems}
                showEditor={showEditor}
                onIndexChange={setItemIndex}
            />
            {editorStatus &&
                <Editor
                    index={itemIndex}
                    items={items}
                    onEdit={editItems}
                    hideEditor={hideEditor}
                />
            }
        </Application>
    )
}


/** styling */

const Application = styled.div`
    @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900');
    font-family: 'Roboto', sans-serif;

    position: relative;

    min-height: 100vh;
    width: 100vw;
    box-sizing: border-box;

    *, *::before, *::after {
        box-sizing: border-box;
    }
`;