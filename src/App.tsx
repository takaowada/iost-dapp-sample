import React, { useState, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Container, Box, Typography, Stack, TextField, Button, Divider, Alert } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import IOSUtil from './iosUtil';
import './App.css'

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'キー',
    width: 100
  },
  {
    field: 'memo',
    headerName: 'メモ',
    width: 100
  }
];

function App() {
  const [memos, setMemos] = React.useState<Memo[]>([]);
  const [response, setResponse] = useState<Memo>([]);
  const [err, setErr] = useState<string>("");

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<Memo>({
    defaultValues: {
      id: "",
      memo: ""
    }
  })

  useEffect(() => {
    const f = async () => {
      try {
        IOSUtil.getInstance().getMemos();
        setMemos(memos);
        console.log('memos', memos);
      } catch (e) {
        console.log(e);
        setErr('iWalletを開いて、ログインしてください');
      }
      //setErr('エラー');
    };
    f();
  }, []);

  const validationRules = {
    id: {
      required: 'キーを入力してください。'
    },
    memo: {
      required: 'メモを入力してください。'
    }
  }

  const onSubmit: SubmitHandler<Memo> = async (data: Memo) => {
    console.log('data', data);
    const handler = await iosUtil.putMemo(data.id, data.memo);
    handler
      .on("pending", () => {
        console.log('Start tx.');
      })
      .on("success", async (response: any) => {
        console.log('Success... tx', response);
        setResponse(response);
        console.log('response', JSON.stringify(response));
        const memos = await iosUtil.getMemos();
        setMemos(memos);
      })
      .on("failed", (err: any) => {
        console.log('failed: ', err);
        setResponse(err);
        console.log('response', JSON.stringify(err));
      });
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          メモの作成
        </Typography>
        <Stack component="form" noValidate
          onSubmit={handleSubmit(onSubmit)}
          spacing={2} sx={{ m: 2, width: '100%' }}>
          <Alert severity="error">{err}</Alert>
          <Controller
            name="id"
            control={control}
            rules={validationRules.id}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                label="キー"
                error={errors.id !== undefined}
                helperText={errors.id?.message}
              />
            )}
          />
          <Controller
            name="memo"
            control={control}
            rules={validationRules.memo}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                multiline
                maxRows={5}
                label="メモ"
                error={errors.memo !== undefined}
                helperText={errors.memo?.message}
              />
            )}
          />
          <Button variant="contained" type="submit">
            メモを書き込む
          </Button>
        </Stack>
      </Box>
      <Divider variant="middle" />
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "100%" }
        }}
      >
        <TextField
          id="response"
          label="レスポンス"
          defaultValue={response}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
      </Box>
      <Divider variant="middle" />
      <Box sx={{ height: 400, width: "100%" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          メモ一覧
        </Typography>
        <DataGrid
          rows={memos}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </Container>
  )
}

export default App
