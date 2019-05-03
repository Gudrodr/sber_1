import * as React from 'react';
import styled from 'styled-components';
import { cityList } from '../citylist';
import { MdClose } from 'react-icons/md';
import { AdvertData } from './type';
import { PHONE_REGEXP } from '..';


interface Props {
    index: number | undefined;
    items: AdvertData[];
    onEdit(data: AdvertData[]): void;
    hideEditor(): void;
}

interface RowProps {
    invalid?: boolean;
    checked?: boolean;
}

const defaultData = {
    title: '',
    description: '',
    phone: '',
    city: 'Москва',
    picture: ''
}

export const Editor = (props: Props) => {
    const data = props.index === undefined ? defaultData : props.items[props.index];

    const [title, setTitle] = React.useState(data.title);
    const [description, setDescription] = React.useState(data.description);
    const [phone, setPhone] = React.useState(data.phone);
    const [city, setCity] = React.useState(data.city);
    const [picture, setPicture] = React.useState(data.picture);
    const [validity, setValidity] = React.useState({title: false, phone: false, checked: false});

    const checkFields =(e: React.FormEvent) => {
        e.preventDefault();

        const validPhone = phone.match(PHONE_REGEXP);
        const validTitle = title !== '';

        setValidity({title: validTitle, phone: !!validPhone, checked: true});
    };

    const loadFile = (e) => {
        try {
            const reader = new FileReader();
            reader.onloadend = () => {
                const dataurl = JSON.stringify(reader.result);
                setPicture(dataurl);
            }
            reader.readAsDataURL(e.target.files[0]);
        } catch (err) {
            console.error(err);
        }
    }
    
    React.useEffect(() => {
        if (!validity.title || !validity.phone) return;

        const localData: AdvertData[] = [...props.items];
        const newData: AdvertData = {
            title,
            phone,
            city,
            description,
            picture
        };

        if (props.index !== undefined) {
            localData[props.index] = newData;
        } else {
            localData.push(newData);
        }

        props.onEdit(localData);
        props.hideEditor();
        
    }, [validity])

    return (
        <SubLayer
            onClick={props.hideEditor}
        >
            <EditorStyled
                onSubmit={e => checkFields(e)}
                onClick={e => e.stopPropagation()}
            >
                <Close 
                    onClick={props.hideEditor}
                >
                    <MdClose />
                </Close>
                <Row invalid={!validity.title} checked={validity.checked}>
                    <label>Название</label>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder='100 символов'
                        maxLength={100}
                        required
                    />
                </Row>
                <Row>
                    <label>Описание</label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder='300 символов'
                        maxLength={300}
                        rows={5}
                    />
                </Row>
                <Row invalid={!validity.phone} checked={validity.checked}>
                    <label>Номер телефона</label>
                    <input
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder='+7 999 999 99 99'
                        required
                    />
                </Row>
                <Row>
                    <label>Город</label>
                    <Select
                        defaultValue={city}
                        onChange={e => setCity(e.target.value)}
                    >
                        {[...cityList].sort().map(item => 
                            <option key={item}>{item}</option>
                        )}
                    </Select>
                </Row>
                <Row>
                    {picture !== undefined && picture !== '' ?
                        <Picture>
                            <PictureRemove
                                onClick={() => setPicture('')}
                            />
                            <img
                                src={JSON.parse(picture)}
                            />
                        </Picture> :
                        <>
                            <label>Изображение</label>
                            <FileInput 
                                type='file'
                                onChange={e => loadFile(e)}
                            />
                        </>
                    }
                </Row>
                <Button
                    type='submit'
                >
                    {props.index !== undefined ? 'Сохранить' : 'Создать'}
                </Button>
            </EditorStyled>
        </SubLayer>
    )
}


/** styling */

const SubLayer = styled.div`
    position: fixed;
    top: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: rgba(240, 240, 240, .7);
`;

const EditorStyled = styled.form`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40em;
    padding: 2em;
    border-radius: .5em;
    box-shadow: 0 0 10px 0 gray;

    background-color: white;
`;

const Close = styled.span`
    position: absolute;
    right: 1em;
    top: 1em;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 1em;
    height: 1em;
    cursor: pointer;
`;

const Row = styled.div<RowProps>`
    display: flex;
    flex-direction: column;
    width: 100%;

    & > input, textarea, select {
        padding: .5em 0 .5em 0;
        background-color: white;
        border: none;
        border-bottom: ${props => props.checked && props.invalid ? '1px solid red' : '1px solid lightgray'};
        margin: .5em 0 1.5em 0;

        ::placeholder {
            font-size: .8rem;
            opacity: .8;
        }
    }
`;

const Select = styled.select`
    cursor: pointer;
`;

const FileInput = styled.input`
    cursor: pointer;
`;

const Picture = styled.div`
    position: relative;
    width: 10em;
    height: 10em;

    & > img {
        max-width: 100%;
        max-height: 100%;
        border-radius: .3em;
    }
`;

const PictureRemove = styled(MdClose)`
    position: absolute;
    top: .2em;
    right: .2em;
    cursor: pointer;
`;

const Button = styled.button`
    width: 10em;
    border-radius: .3em;
    cursor: pointer;
`;