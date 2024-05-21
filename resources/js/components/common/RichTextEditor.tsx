import React from 'react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

import ReactSunEditor from 'suneditor-react';
import { Forum, forumValidator } from '@/lib/validation/forum';
import { type SunEditorReactProps } from 'suneditor-react/dist/types/SunEditorReactProps';
import { Button } from '../ui/button';


const MyComponent = (editorProps) => {
    return (
        <div className="flex flex-col w-full bg-white p-2">
            <ReactSunEditor
                height="300px"
                width="100%"
                setOptions={{
                    resizingBar: false,
                    buttonList: [
                        // [
                        //   'formatBlock',
                        //   'font',
                        //   'fontSize',
                        //   'bold',
                        //   'underline',
                        //   'italic',
                        //   'strike',
                        //   'superscript',
                        //   'subscript',
                        //   'removeFormat',
                        // ],
                        [
                            'blockquote',
                            'showBlocks',
                            'fontColor',
                            'hiliteColor',
                            'outdent',
                            'indent',
                            'align',
                            'list',
                            'horizontalRule',
                            'table',
                            'link',
                            'image',
                            'video',
                        ],
                        // '/',
                        // ['undo', 'redo'],
                        // ['preview'],
                    ],
                }}
                setDefaultStyle={editorProps.setDefaultStyle}
                defaultValue={editorProps.defaultValue}
                getSunEditorInstance={editorProps.getSunEditorInstance}
                onChange={editorProps.onChange}
            />
            <div className="flex justify-end mt-3 p-2">
                <Button variant="secondary" className="bg-black text-white left-0 hover:text-black" onClick={editorProps.submitForum}>Submit Response</Button>
            </div>
        </div>
    );
};

export default MyComponent;
