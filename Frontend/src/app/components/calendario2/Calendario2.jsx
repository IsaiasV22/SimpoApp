"use client";
import React from 'react';
import {
  useEpg,
  Epg,
  Layout,
  ProgramBox,
  ProgramContent,
  ProgramFlex,
  ProgramStack,
  ProgramTitle,
  ProgramText,
  ProgramImage,
  useProgram,
} from 'planby';

function App() {

    const channels = React.useMemo(
        () => [
          {
            logo: 'https://via.placeholder.com',
            uuid: '10339a4b-7c48-40ab-abad-f3bcaf95d9fa',
          },
        ],
        []
      );
      const epg = React.useMemo(
        () => [
          {
            channelUuid: '30f5ff1c-1346-480a-8047-a999dd908c1e',
            description:
              'Ut anim nisi consequat minim deserunt...',
            id: 'b67ccaa3-3dd2-4121-8256-33dbddc7f0e6',
            image: 'https://via.placeholder.com',
            since: "2022-02-02T23:50:00",
            till: "2022-02-02T00:55:00",
            title: 'Title',
          },
        ],
        []
      );
  const {
    getEpgProps,
    getLayoutProps,
  } = useEpg({
    epg,
    channels,
    isBaseTimeFormat: true,
    startDate: '2022/02/02', // or 2022-02-02T00:00:00
  });

  const Item = ({ program, ...rest }) => {
    const {
      styles,
      formatTime,
      set12HoursTimeFormat,
      isLive,
      isMinWidth,
    } = useProgram({
      program,
      ...rest
    });

    const { data } = program;
    const { image, title, since, till } = data;

    const sinceTime = formatTime(since, set12HoursTimeFormat()).toLowerCase();
    const tillTime = formatTime(till, set12HoursTimeFormat()).toLowerCase();

    return (
      <ProgramBox width={styles.width} style={styles.position}>
        <ProgramContent
          width={styles.width}
          isLive={isLive}
        >
          <ProgramFlex>
            {isLive && isMinWidth && <ProgramImage src={image} alt="Preview" />}
            <ProgramStack>
              <ProgramTitle>{title}</ProgramTitle>
              <ProgramText>
                {sinceTime} - {tillTime}
              </ProgramText>
            </ProgramStack>
          </ProgramFlex>
        </ProgramContent>
      </ProgramBox>
    );
  };

  return (
    <div>
      <Epg {...getEpgProps()}>
        <Layout {...getLayoutProps()} renderProgram={({ program, ...rest }) => <Item key={program.data.id} program={program} {...rest} />} />
      </Epg>
    </div>
  );
}

export default App;
