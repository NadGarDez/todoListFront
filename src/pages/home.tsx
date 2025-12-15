import React, { useCallback, useEffect, useMemo, useRef, useState, type JSX } from "react";
import BackgroundLayout from "../components/layout/backgroundLaout";
import MobileFirstContainer from "../components/layout/mobileFirstContainer";
import DefaultModal from "../components/ui/defaultModal";
import Slider, { type Settings } from 'react-slick';
import StandardModalContent from "../components/ui/standarModalContent";
import { CLIENT_ID, COGNITO_DOMAIN, LOGOUT_URL } from "../constants";
import HomeHeader from "../components/layout/homeHeader";
import { FloatingAddButton } from "../components/ui/floatingAddButton";
import TaskList from "../components/ui/TaskList";
import { type ApiTask, type TaskInterface } from "../types";
import { createTask, deleteTask, getTask, getTasks, markAsComplete, updateTask } from "../api";
import { useAuth } from "react-oidc-context";
import { TaskForm } from "../components/ui/TaskForm";

const sliderConfig: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
};

interface modalState {
    visible: boolean,
    contentName: 'signOut' | 'delete' | 'error',
    error?: string
}

const defaultTaskData: TaskInterface = {
    id: 0,
    title: '',
    labels: [],
    description: '',
    done: false
}

const Home = (): JSX.Element => {

    const [activeItem, setActiveItem] = useState<TaskInterface>(defaultTaskData);
    const sliderRef = useRef<Slider>(null);

    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    const { user } = useAuth()


    const [tasks, setTasks] = useState<ApiTask[]>([])

    const [modalState, setModalStatus] = useState<modalState>({
        visible: false,
        contentName: 'signOut'
    })

    const token = useMemo(
        () => {
            return user?.access_token ?? ''
        },
        [user] 
    );
    
    const handleError = useCallback((error: unknown) => {
        const errorMessage = error instanceof Error 
            ? error.message 
            : typeof error === 'string' ? error : 
              'Ocurrió un error desconocido.';
        
        setModalStatus({
            visible: true,
            contentName: 'error',
            error: errorMessage
        });
    }, []);

    const requestTasks = useCallback(
        async () => {
            try {
                const tasks = await getTasks(token)
                setTasks(tasks);
            } catch (error) {
                handleError(error) 
            }
        },
        [token, handleError] 
    )

    useEffect(
        () => {
            if (activeSlideIndex === 0) {
                requestTasks()
            }
        },
        [activeSlideIndex, requestTasks]
    )

    const signOut = () => {
        window.location.href = `${COGNITO_DOMAIN}/logout?client_id=${CLIENT_ID}&logout_uri=${encodeURIComponent(LOGOUT_URL)}`;
    };

    const toggleVisibility = () => {
        setModalStatus(
            {
                ...modalState, visible: !modalState.visible
            }
        )
    }

    const onChangeVisibility = (newVisibility: boolean) => {
        setModalStatus({ ...modalState, visible: newVisibility })
    }

    const back = () => {
        sliderRef.current?.slickPrev();
        setActiveItem(defaultTaskData)
    }

    const next = () => {
        sliderRef.current?.slickNext();
    }


    const onPressLogOut = () => {
        setModalStatus(
            {
                contentName: 'signOut',
                visible: true
            }
        )
    }

    const onPressDetail = (item: TaskInterface) => {
        setActiveItem(item);
        next()
    }

    const onPressDelete = (item: TaskInterface) => {
        setActiveItem(item);
        setModalStatus(
            {
                contentName: 'delete',
                visible: true
            }
        )
    }

    const onPressAdd = () => {
        setActiveItem(defaultTaskData)
        next()
    }


    const finaleDelete = async () => {
        try {
            await deleteTask(token, activeItem.id)
            setActiveItem(defaultTaskData);
            toggleVisibility();
            requestTasks();
        } catch (error) {
            handleError(error);
        }
    }


    const createOrUpdate = async (data: TaskInterface | ApiTask) => {
        try {
            if (data.id === 0) {
                await createTask(token, data as TaskInterface);
            } else {
                await updateTask(token, data as ApiTask)
            }
            back();
            requestTasks(); 
        } catch (error) {
            handleError(error);
        }
    }


    const onPressDone =  async (data: TaskInterface) => {
        try {
            await markAsComplete(token, data.id)
            requestTasks(); 
        } catch (error) {
            handleError(error);
        }
    }


    const clearError = () => {
        setModalStatus(
            {
                contentName: 'signOut',
                visible: false
            }
        )
    }

    const finalSliderConfig: Settings = {
        ...sliderConfig,
        beforeChange(_, nextSlide) {
            setActiveSlideIndex(nextSlide)
        },
    };

    return (

        <BackgroundLayout >
            <MobileFirstContainer>
                <HomeHeader
                    onPressLogOut={onPressLogOut}
                />

                <Slider {...finalSliderConfig} ref={sliderRef}>
                    <div>
                        <TaskList
                            tasks={tasks}
                            onPressDelete={onPressDelete}
                            onPressDetail={onPressDetail}
                            onPressDone={onPressDone}
                        />

                    </div>
                    <div>
                        <TaskForm
                            task={activeItem}
                            onSubmit={createOrUpdate}
                            back={back}
                        />
                    </div>
                </Slider>

                {activeSlideIndex === 0 && (
                    <FloatingAddButton
                        onPressAdd={onPressAdd}
                    />
                )}


                <DefaultModal
                    visible={modalState.visible}
                    relativeHeight="35%"
                    onChangeVisibility={onChangeVisibility}
                >
                    {
                        modalState.contentName === 'signOut' ? (
                            <StandardModalContent
                                title="¿Estás seguro de que quieres cerrar sesión?"
                                subtitle="Serás redirigido a la página de inicio de sesión."
                                onCancel={toggleVisibility}
                                onAction={signOut}
                                actionLabel="Cerrar Sesión"
                            />
                        ) : modalState.contentName === 'delete'? (
                            <StandardModalContent
                                title={`¿Estás seguro de que quieres eliminar el elemento ${activeItem.id}?`}
                                subtitle="Los datos eliminados son irrecuperables."
                                onCancel={toggleVisibility}
                                onAction={finaleDelete}
                                actionLabel="Eliminar"
                            />
                        ) : (
                            <StandardModalContent
                                title={`Error`}
                                subtitle={modalState.error ?? 'Error desconocido de la aplicación.'}
                                onAction={clearError}
                                actionLabel="Aceptar"
                            />
                        )
                    }
                </DefaultModal>
            </MobileFirstContainer>
        </BackgroundLayout>
    );
};

export default Home;