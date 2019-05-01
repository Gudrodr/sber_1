import * as React from 'react';
import styled from 'styled-components';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import { AdvertData } from './type';

interface Props {
    data: AdvertData;
    index: number;
    removeItem(index: number): void;
    editItem(index: number): void;
}

const Advert: React.FunctionComponent<Props> = (props) => {

    return (
        <AdvertStyled>
            <Part1>
                <Block>
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
                </Block>
                <Picture>
                    {props.data.picture !== undefined && props.data.picture !== '' &&
                        <img
                            src={JSON.parse(props.data.picture)}
                        /> ||
                        <div>нет изображения</div>
                    }
                </Picture>
            </Part1>
            <Part2
                description={props.data.description}
            >
                {props.data.description !== '' && 
                    <ContentPart>
                        <span>Описание</span>
                        <p>{props.data.description}</p>
                    </ContentPart>
                }
                <Buttons>
                    <button
                        onClick={() => props.removeItem(props.index)}
                    >
                        <MdDelete />
                    </button>
                    <button
                        onClick={() => props.editItem(props.index)}
                    >
                        <MdModeEdit />
                    </button>
                </Buttons>
            </Part2>
        </AdvertStyled>
    )
}

export default Advert;


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

const Part1 = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 1em;
`;

const Block = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
`;

const Part2 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: ${(props: {description: string}) => props.description === '' ? 'flex-end' : 'space-between'}
    width: 100%;
`;

const Title = styled.h3`
    text-align: center;
    margin: 0 0 .5em 0;
`;

const ContentPart = styled.div`
    display: flex;
    flex-direction: column;

    span {
        font-size: .8em;
        padding-bottom: .4em;
        opacity: .7;
    }

    p {
        margin: 0 0 1em .5em;
    }
`;

const Picture = styled.div`
    width: 10em;
    height: 10em;

    img {
        max-width: 100%;
        max-height: 100%;
        border-radius: .3em;
    }

    div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: rgb(220, 220, 220);
        border-radius: .3em;
    }
`;

const Buttons = styled.div`
    line-height: 2em;

    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 2em;
    margin-top: 1em;

    button {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: .2em;
        cursor: pointer;
    }
`;