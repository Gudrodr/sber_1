import * as React from 'react';
import styled from 'styled-components';
import List from './List';
import Editor from './Editor';
import Advert from './Advert';
import { AdvertData } from './type';


const App: React.FunctionComponent = (props) => {
    const [showEditor, setShowEditor] = React.useState<boolean>(false);
    const [items, setItems] = React.useState<AdvertData[]>([]);
    const [itemIndex, setItemIndex] = React.useState<undefined | number>(undefined);
    
    const editItems = (data: AdvertData[]) => {
        setItems(data);
        localStorage.setItem('adverts', JSON.stringify(data));
    }

    React.useEffect(() => {
        setItems(JSON.parse(localStorage.getItem('adverts') || '[]'));
    }, []);
        
    return (
        <Application>
            <List
                items={items}
                editItems={editItems}
                showEditor={setShowEditor}
                setIndex={setItemIndex}
            />
            {showEditor &&
                <Editor
                    index={itemIndex}
                    items={items}
                    editItems={editItems}
                    showEditor={setShowEditor}
                />
            }
        </Application>
    )
}

export default App;


/** styling */

const Application = styled.div`
    @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900');
    font-family: 'Roboto', sans-serif;

    position: relative;

    height: 100vh;
    width: 100vw;
    box-sizing: border-box;

    *, *::before, *::after {
        box-sizing: border-box;
    }
`;