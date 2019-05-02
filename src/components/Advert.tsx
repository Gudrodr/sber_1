import * as React from 'react';
import styled from 'styled-components';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import { AdvertData } from './type';

interface Props {
    data: AdvertData;
    index: number;
    onDelete(index: number): void;
    onEdit(index: number): void;
}

interface SecondPartProps {
    description: string;
}

export const Advert = (props: Props) => {

    const onDelete = () => props.onDelete(props.index);
    const onEdit = () => props.onEdit(props.index);

    return (
        <AdvertStyled>
            <FirstPart>
                <MainInfo>
                    <Title>{props.data.title}</Title>
                    <ContentPart>
                        <span>Телефон</span>
                        <p>{props.data.phone}</p>
                    </ContentPart>
                    {props.data.city !== '' && 
                        <ContentPart>
                            <span>Город</span>
                            <p>{props.data.city}</p>
                        </ContentPart>
                    }
                </MainInfo>
                <Picture>
                    {props.data.picture !== undefined && props.data.picture !== '' ?
                        <img
                            src={JSON.parse(props.data.picture)}
                        /> :
                        <div>нет изображения</div>
                    }
                </Picture>
            </FirstPart>
            <SecondPart
                description={props.data.description}
            >
                {props.data.description !== '' && 
                    <ContentPart>
                        <span>Описание</span>
                        <p>{props.data.description}</p>
                    </ContentPart>
                }
                <ButtonsArea>
                    <button
                        onClick={onDelete}
                    >
                        <MdDelete />
                    </button>
                    <button
                        onClick={onEdit}
                    >
                        <MdModeEdit />
                    </button>
                </ButtonsArea>
            </SecondPart>
        </AdvertStyled>
    )
}


/** styling */

const AdvertStyled = styled.div`
    word-wrap: break-word;

    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 25em;
    min-height: 20em;
    padding: .5em;
    border-radius: .5em;
    margin-bottom: 2em;
    box-shadow: 0 0 10px 0 gray;
`;

const FirstPart = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 1em;
`;

const MainInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
`;

const SecondPart = styled.div<SecondPartProps>`
    display: flex;
    flex-direction: column;
    justify-content: ${props => props.description === '' ? 'flex-end' : 'space-between'}
    width: 100%;
`;

const Title = styled.h3`
    text-align: center;
    margin: 0 0 .5em 0;
`;

const ContentPart = styled.div`
    display: flex;
    flex-direction: column;

    & > span {
        font-size: .8em;
        padding-bottom: .4em;
        opacity: .7;
    }

    & > p {
        margin: 0 0 1em .5em;
    }
`;

const Picture = styled.div`
    width: 10em;
    height: 10em;

    & > img {
        max-width: 100%;
        max-height: 100%;
        border-radius: .3em;
    }

    & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: rgb(220, 220, 220);
        border-radius: .3em;
    }
`;

const ButtonsArea = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 2em;
    margin-top: 1em;

    & > button {
        width: 2em;
        height: 2em;
        padding: .4em;
        border-radius: .2em;
        cursor: pointer;
    }
`;