import * as React from 'react';
import styled from 'styled-components';
import { Advert } from './Advert';
import { MdAdd } from 'react-icons/md';
import { AdvertData } from './type';


interface Props {
    items: AdvertData[];
    onEdit(data: AdvertData[]): void;
    showEditor(): void;
    onIndexChange(index: number): void;
}

export const List = (props: Props) => {

    const removeItem = (index: number) => {
        const items = [...props.items];
        items.splice(index, 1);
        props.onEdit(items);
    }

    const editItem = (index: number) => {
        props.onIndexChange(index);
        props.showEditor();
    }

    return (
        <ListStyled>
            {props.items.map((item, index) =>
                <Advert
                    key={index}
                    data={item}
                    index={index}
                    onDelete={removeItem}
                    onEdit={editItem}
                />
            )}
            <AddItem>
                <div
                    onClick={props.showEditor}
                >
                    <MdAdd
                        color='white'
                        size='6em'
                    />
                </div>
            </AddItem>
        </ListStyled>
    )
}


/** styling */

const ListStyled = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    padding: 2.5em;
`;

const AddItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25em;
    height: 20em;

    & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 10em;
        height: 10em;
        background-color: gray;
        border-radius: 5em;
        cursor: pointer;
    }
`;