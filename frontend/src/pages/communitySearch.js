import React, { useState } from "react";
import { ThemeProvider, CssBaseline, TextField, Grid, InputAdornment, IconButton, Button, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import theme from "../theme/theme";
import { useRouter } from "next/router";

const CommunitySearch = () => {
    const router = useRouter();

    const [keyword, setKeyword] = useState('');

    const handleKeywordChange = (event) => {
        setKeyword(event.target.value);
    };

    const [selectedTag, setSelectedTag] = useState(null);

    const handleTagClick = (tag) => {
        if (selectedTag === tag) {
            setSelectedTag(null);
            setKeyword('');
        } else {
            setSelectedTag(tag);
            setKeyword(tag);
        }
    };    

    const handleBackClick = () => {
        setSelectedTag(null);
        setKeyword('');
        router.back();
    };

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <Grid container sx={{ p: '0 24px'}}>
                {/* 검색어 입력 */}
                <Grid item xs={12} sx={{p: '16px 0'}}>
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <TextField
                                fullWidth
                                value={keyword}
                                onChange={handleKeywordChange}
                                InputProps={{
                                    placeholder: "검색어를 입력해주세요.",
                                    style: {
                                        height: '44px',
                                        fontSize: '14px',
                                        fontWeight: 700,
                                    },
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& fieldset': {
                                        border: 'none',
                                    },
                                    color: '#9E9E9E',
                                    backgroundColor: '#F2F2F2',
                                    borderRadius: '8px',
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <IconButton style={{paddingRight: '0'}} onClick={handleBackClick}>
                                <ClearIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>

                {/* 태그 */}
                <Grid item xs={12} sx={{p: '20px 0 10px'}}>
                    <Typography sx={{ fontSize: '16px', color: '#3C3C3C', fontWeight: 700 }}>
                        태그 검색
                    </Typography>
                    <Grid container sx={{overflowX: 'auto', flexWrap: 'nowrap', m: '14px 0 10px'}}>
                        <Grid item>
                            {
                            ["뭐 먹을까요?", "같이 먹어요", "기타"].map((tag, index) => (
                                <Button key={index} 
                                    style={{
                                        fontSize:'14px', 
                                        fontWeight: 400, 
                                        color: '#3C3C3C',
                                        backgroundColor: selectedTag === tag ? '#FFFCE4' : 'transparent',
                                        padding: '3px 20px', 
                                        marginRight: '10px', 
                                        borderRadius: '20px', 
                                        border: selectedTag === tag ? '1px solid #FFCE00' : '1px solid #E2E2E2',
                                    }}
                                    onClick={() => handleTagClick(tag)}
                                >
                                    {tag}
                                </Button>
                            ))}
                        </Grid>     
                    </Grid>
                </Grid>          
            </Grid>
        </ThemeProvider>
    );
};

export default CommunitySearch;
